--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE PlayCounter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id TEXT,
    play_count INTEGER
);

CREATE TABLE GamesList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT
);
CREATE TABLE MemQueue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id TEXT,
    member_name TEXT,
    ign TEXT,
    pubg_id TEXT,
    game_id INTEGER,
    FOREIGN KEY(game_id) REFERENCES GamesList(id) 
);
--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE PlayCounter;
DROP TABLE MemQueue;
DROP TABLE GamesList;