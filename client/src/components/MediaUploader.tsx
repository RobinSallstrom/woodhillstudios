// MediaUploader — Underground Cinema Design System
// Drag-and-drop file upload component backed by S3 via tRPC
// Shows upload progress, file library grid, and delete controls

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, AlertCircle, Trash2, Image, FileText, Copy } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

type Category = 'hero' | 'portfolio' | 'about' | 'general';

interface MediaUploaderProps {
  category?: Category;
  artistId?: string;
  onUploaded?: (url: string) => void;
  className?: string;
}

interface UploadItem {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress: number;
  url?: string;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith('image/')) return <Image size={14} className="text-[#C4622D]" />;
  return <FileText size={14} className="text-white/40" />;
}

export default function MediaUploader({ category = 'general', artistId, onUploaded, className = '' }: MediaUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<UploadItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const uploadMutation = trpc.storage.upload.useMutation();
  const deleteMutation = trpc.storage.delete.useMutation();

  const { data: files = [], isLoading: filesLoading } = trpc.storage.list.useQuery({
    category,
    artistId,
    limit: 50,
  });

  const processFiles = useCallback(async (fileList: FileList | File[]) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'application/pdf'];
    const maxSize = 20 * 1024 * 1024; // 20 MB

    const newItems: UploadItem[] = [];
    for (const file of Array.from(fileList)) {
      if (!allowed.includes(file.type)) {
        toast.error(`${file.name}: unsupported file type`);
        continue;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name}: exceeds 20 MB limit`);
        continue;
      }
      newItems.push({ id: crypto.randomUUID(), file, status: 'pending', progress: 0 });
    }

    setQueue(prev => [...prev, ...newItems]);

    for (const item of newItems) {
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'uploading', progress: 10 } : q));

      try {
        // Read file as base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // strip data URL prefix
          };
          reader.onerror = reject;
          reader.readAsDataURL(item.file);
        });

        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 50 } : q));

        const record = await uploadMutation.mutateAsync({
          data: base64,
          originalName: item.file.name,
          mimeType: item.file.type,
          fileSize: item.file.size,
          category,
          artistId,
        });

        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'done', progress: 100, url: record.url } : q));
        onUploaded?.(record.url);
        utils.storage.list.invalidate();
        toast.success(`${item.file.name} uploaded`);
      } catch (err: any) {
        const msg = err?.message ?? 'Upload failed';
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error', error: msg } : q));
        toast.error(`${item.file.name}: ${msg}`);
      }
    }
  }, [category, artistId, uploadMutation, onUploaded, utils]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      utils.storage.list.invalidate();
      toast.success('File removed');
    } catch {
      toast.error('Could not delete file');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 py-12 px-6 text-center ${
          dragOver
            ? 'border-[#C4622D] bg-[#C4622D]/5'
            : 'border-white/10 hover:border-white/20 bg-[#0A0A0A]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/mp4,application/pdf"
          className="hidden"
          onChange={e => e.target.files && processFiles(e.target.files)}
        />
        <Upload size={24} className={`transition-colors duration-300 ${dragOver ? 'text-[#C4622D]' : 'text-white/20'}`} />
        <div>
          <p className="font-mono-label text-[11px] text-white/50">
            Drop files here or <span className="text-[#C4622D]">browse</span>
          </p>
          <p className="font-mono-label text-[9px] text-white/20 mt-1">
            JPG, PNG, WEBP, GIF, MP4, PDF — max 20 MB
          </p>
        </div>
        {dragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 border-2 border-[#C4622D] pointer-events-none"
          />
        )}
      </div>

      {/* Upload queue */}
      <AnimatePresence>
        {queue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <div className="rule-label">Uploading</div>
            {queue.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-[#0D0D0D] border border-white/5 px-4 py-3">
                <FileIcon mimeType={item.file.type} />
                <div className="flex-1 min-w-0">
                  <p className="font-mono-label text-[10px] text-white/60 truncate">{item.file.name}</p>
                  <p className="font-mono-label text-[9px] text-white/25">{formatBytes(item.file.size)}</p>
                  {item.status === 'uploading' && (
                    <div className="mt-1.5 h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-[#C4622D]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
                {item.status === 'done' && <CheckCircle size={14} className="text-green-500 flex-shrink-0" />}
                {item.status === 'error' && <AlertCircle size={14} className="text-red-400 flex-shrink-0" />}
                <button
                  onClick={() => setQueue(prev => prev.filter(q => q.id !== item.id))}
                  className="text-white/20 hover:text-white/50 transition-colors duration-200 flex-shrink-0"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File library */}
      <div>
        <div className="rule-label mb-4">
          {category === 'general' ? 'All Files' : `${category.charAt(0).toUpperCase() + category.slice(1)} Files`}
          {files.length > 0 && <span className="ml-2 text-white/20">({files.length})</span>}
        </div>

        {filesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#0D0D0D] animate-pulse" style={{ aspectRatio: '1' }} />
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="border border-white/5 py-12 flex flex-col items-center gap-2">
            <Image size={20} className="text-white/10" />
            <p className="font-mono-label text-[10px] text-white/20">No files uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {files.map(file => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-[#0D0D0D] border border-white/5 overflow-hidden"
                style={{ aspectRatio: '1' }}
              >
                {file.mimeType.startsWith('image/') ? (
                  <img
                    src={file.url}
                    alt={file.originalName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
                    <FileText size={24} className="text-white/20" />
                    <span className="font-mono-label text-[9px] text-white/30 text-center truncate w-full">
                      {file.originalName}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                  <p className="font-mono-label text-[9px] text-white/60 text-center truncate w-full">
                    {file.originalName}
                  </p>
                  <p className="font-mono-label text-[9px] text-white/30">{formatBytes(file.fileSize)}</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => copyUrl(file.url)}
                      className="p-1.5 border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors duration-200"
                      title="Copy URL"
                    >
                      <Copy size={11} />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-1.5 border border-red-900/40 text-red-400/60 hover:text-red-400 hover:border-red-400/40 transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
