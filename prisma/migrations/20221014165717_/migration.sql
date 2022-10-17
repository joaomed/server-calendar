-- CreateTable
CREATE TABLE "Date" (
    "title" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateTitle" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    CONSTRAINT "Tarefa_dateTitle_fkey" FOREIGN KEY ("dateTitle") REFERENCES "Date" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);
