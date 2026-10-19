CREATE TABLE `beta_signups` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`need` text NOT NULL,
	`tools_json` text NOT NULL,
	`language` text NOT NULL,
	`demo_json` text NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `beta_signups_email_unique` ON `beta_signups` (`email`);