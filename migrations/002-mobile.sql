-- Up 
ALTER TABLE GamesList
ADD COLUMN is_mobile INTEGER;
 
-- Down 
ALTER TABLE GamesList
DROP COLUMN is_mobile;