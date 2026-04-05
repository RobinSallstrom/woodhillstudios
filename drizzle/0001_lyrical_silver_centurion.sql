CREATE TABLE `media_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`url` text NOT NULL,
	`originalName` varchar(255) NOT NULL,
	`mimeType` varchar(128) NOT NULL,
	`fileSize` bigint NOT NULL,
	`category` enum('hero','portfolio','about','general') NOT NULL DEFAULT 'general',
	`artistId` varchar(64),
	`uploadedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_files_id` PRIMARY KEY(`id`)
);
