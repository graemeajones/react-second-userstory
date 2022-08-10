echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* graeme@62.31.242.68:/var/www/62.31.242.68/

echo "Done!"