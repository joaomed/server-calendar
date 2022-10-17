-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tarefa" ("date", "description", "hourEnd", "hourStart", "id", "location", "title") SELECT "date", "description", "hourEnd", "hourStart", "id", "location", "title" FROM "Tarefa";
DROP TABLE "Tarefa";
ALTER TABLE "new_Tarefa" RENAME TO "Tarefa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
