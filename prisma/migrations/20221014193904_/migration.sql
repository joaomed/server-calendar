/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `dateTitle` on the `Tarefa` table. All the data in the column will be lost.
  - Added the required column `date` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Date";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Tarefa" ("description", "hourEnd", "hourStart", "id", "location", "title") SELECT "description", "hourEnd", "hourStart", "id", "location", "title" FROM "Tarefa";
DROP TABLE "Tarefa";
ALTER TABLE "new_Tarefa" RENAME TO "Tarefa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
