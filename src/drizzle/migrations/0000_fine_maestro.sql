CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT 1738033101229,
	`completed` integer DEFAULT 0
);
