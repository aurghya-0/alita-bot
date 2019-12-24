-- Up 
ALTER TABLE GamesList
ADD COLUMN is_mobile INTEGER DEFAULT 0;
 
-- Down 
ALTER TABLE GamesList
DROP COLUMN is_mobile;