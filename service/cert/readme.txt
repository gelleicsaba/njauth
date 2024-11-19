sudo apt-get install libcap2-bin

sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
sudo setcap cap_net_bind_service=+ep `readlink -f \`which nodemon\``
sudo setcap cap_net_bind_service=+ep `readlink -f \`which npm\``
