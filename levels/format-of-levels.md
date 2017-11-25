#Notes
All directories are from the root directory
Lines beginning with '#' are ignored
words in quotes should be taken literally.

#Environment Tiles
(x-co-ordinate) (y-co-ordinate) ("solid" / "background") (file path to image)
Example: 
0 0 solid assets/images/environment/panel-1.png

#Exit to another level, specifying the co-ordinate you go to in the other level
(x-co-ordinate) (y-co-ordinate) ("exit") (file path to level) (level x-co-ordinate) (level y-co-ordinate)
Example:
8 0 exit levels/boss-1.txt 0 2
