cd /var/www/teste/
cat teste_errado.php |sed 's/\"[^$\"]*\($[a-zA-Z_]\+\)[^\"]*\"/\1/g'| sed 's/\"[^\"]*\"//g' |sed 's/ \+//g' >~/Desktop/scripts/php/aux.txt ;cat -n ~/Desktop/scripts/php/aux.txt |sed 's/^[ \t]\+//g' |sed 's/[\t ]\+/ /g'>~/Desktop/scripts/php/teste_errado.php
