Remove-Item -Force -Recurse -Path build
New-Item -Force -Path . -Name build -ItemType 'directory'
Copy-Item -Force index.html -Destination 'build/index.html'
Copy-Item -Force README.md -Destination 'build/README.md'
Copy-Item -Force -Recurse asset -Destination 'build/asset'
Copy-Item -Force -Recurse -Path dist -Destination 'build/dist'
