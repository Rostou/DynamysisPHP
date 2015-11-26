cd /tmp
cat trace.2043925204.xt |sed 's/.\+\([-=]>\).\+\/\([a-zA-Z_]\+\.php\:[0-9]\+\) *$/\1 \2/g' |sed 's/.*>=>.*//g' | sed -e '/^[^=-]/d' |sed '/^\s*$/d'>~/Desktop/scripts/out/aux.txt ;cat -n ~/Desktop/scripts/out/aux.txt |sed 's/^[ \t]\+//g' |sed 's/[\t ]\+/ /g'>~/Desktop/scripts/out/trace_teste_errado.txt
