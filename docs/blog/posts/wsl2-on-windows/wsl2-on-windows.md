---
title: WSL2 on Windows
date: 2023-01-23
author: Chittapriya Mondal
tags:
  - WSL2
  - WINDOWS
  - LINUX
---
# WSL2 on Windows

Windows operating system provides "Windows Subsystem for Linux" which can be utilized to develop using Linux operating system and have Linux based tools. Windows operating system is providing a great interoperability so that it is very easy to operate between Linux distribution and base operating system. I still remember the old days where we had to do so many things to have Linux OS with the base operating system. Popular choices were to have dedicated partitions to have different Operating systems or have Virtual Machine to host any OS of your choice. For both the cases, the development experience was not that great.

Modern development is based on Containerization technologies and for Windows operating system, Docker Desktop is a popular choice to create docker environment in Windows operating system. Docker Desktop was using Hyper-v based virtualization technology and Linux OS to provide required environment. Later it started supporting WSL to provide containerization capabilities.

Recent licensing agreement says Docker Desktop is not free for enterprises and you need license to use it. Docker Desktop is a great tool but it has license cost associated with it. New tools are coming like Rancher Desktop which shows great potential. You may explore these tools if you are comfortable using GUI based tools. If you are comfortable using command and CLIs then you can setup you own environment using WSL2.

I have recently configured my development setup using WSL2 on Windows 11. 

I have noted all the tips and tricks to resolve the issues which I encountered during this journey. 

## Step 1 : Setting up WSL 2 in WINDOWS 10/11

Go to Windows + R and enter appwiz.cpl

Click on "Turn Windows Features on or off" . Enable "Windows Sub System for Linux" and "Virtual Machine Platform" 
Then restart the machine.

Open power shell

```bash
wsl --install
```

If WSL is already installed 
```bash
wsl --update 
```

Setting WSL2 as default 
```bash
wsl --set-default-version 2
```

How to see available distributions?
```bash
wsl -l -o
```
How to check installed distributions
```bash
wsl -l -v
```

Installing specific distribution
```bash
wsl --install -d <distribution name>
# example : wsl --install -d Ubuntu-20.04
```
Note down username and password.

To Stop distribution : 
```bash
wsl --terminate Ubuntu-20.04
```

To unregister distribution : 
```bash
wsl --unregister Ubuntu-20.04
```
### Step2 : Mounts - accessing windows file in Linux and vice versa

**Find Linux packages under windows folder**
```cmd
C:\Users\<uername>\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu20.04onWindows_79fggfdhp1fndgsc
```

**Seeing Linux files in WINDOWS**
Locating distribution files in windows - 
```cmd
\\wsl$
```

This will show all the distributions and you can enter into specific distributions 
```cmd
\\wsl.localhost\Ubuntu-20.04
```
Accessing Windows file system in WLS distribution
use /mnt to navigate any to drive. 

Example : 
```bash
cd /mnt/c
# or 
/mnt/d/<sub-folder>
```

use ls command to see the files
```bash
testuser@vvdsfsf04:/mnt/c$ sudo ls
```

To go back to root - 
```bash
testuser@vvdsfsf04:/mnt/c$ cd ~
```


## Step 3: Using Visual Studio Code to modify Linux projects

Installing and opening VS code form WSL distribution
```bash
testuser@vvdsfsf04:~$ code .
```
It should open Visual Studio Code with Linux terminal so that you can execute any Linux command from here. You can install "Remote WSL" extension upfront.

You can also connect WSL distributions form visual studio
Open Visual Studio Code
Press Ctrl + Shift + P and the search "new WSL window with Distribution". You should be able to select installed distributions.


## Step 4: Windows terminal

It is better to use windows terminal to access all the Linux distributions.
You can install from Windows store or any other procedure as mentioned in the below link
[Microsoft Terminal](https://github.com/microsoft/terminal)

Note:- Windows 11 it is pre installed.

Sometimes for corporate environment windows store is not available. in that case use Powershell and package manager - 

```cmd
winget install --id=Microsoft.WindowsTerminal -e
```

Windows terminal shall provide distribution specific terminals and it is easy to operate multiple distributions



## Step 5 : Internet Connectivity inside WSL distribution

```bash
sudo apt-get update
```

If you see it is not working follow the below steps

Generally for personal computer you do not need to any thing but sometimes for corporate network you need to some configurations. This a hack which I did  to get internet connections but we need to have a better solution. I will update this section once I have some update.

## Step 5

### Step 5.a : Create a WSL conf file under /etc/ folder

```bash
sudo nano /etc/wsl.conf
```

Paste the below text
```text
[network]
generateResolvConf = false
```

### Step 5.b : Remove default resolv.conf

```bash
sudo rm /etc/resolv.conf
```

### Step 5.c : Create new Resolve.conf 

```bash
sudo nano /etc/resolv.conf
```

and paste 
```text
nameserver 8.8.8.8
```

Now, Restart the distribution

## Step 6 : Installing Docker

Docker installation and Docker Compose installation
Use below commands to start docker immediately and start docker while starting up the OS.  

```bash 
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

If you see the below error -- 

System has not been booted with systemd as init system (PID 1). Can't operate. Failed to connect to bus: Host is down

You can use instead

```bash
sudo service docker start
sudo --status-all
```

Avoid starting every time, You can follow the below steps to start at start-up -- 

### Step 1:
```bash
sudo visudo
```

<username> ALL=(ALL) NOPASSWD: /usr/bin/dockerd 

### Step 2:

```bash
echo '# Start Docker daemon automatically when logging in if not running.' >> ~/.bashrc
echo 'RUNNING=`ps aux | grep dockerd | grep -v grep`' >> ~/.bashrc
echo 'if [ -z "$RUNNING" ]; then' >> ~/.bashrc
echo '    sudo dockerd > /dev/null 2>&1 &' >> ~/.bashrc
echo '    disown' >> ~/.bashrc
echo 'fi' >> ~/.bashrc
```

### Step 3:
```bash
sudo usermod -a -G docker <<user>>
```


## Step 7: Accessing Linux applications from WINDOWS

[Microsoft Networking](https://docs.microsoft.com/en-us/windows/wsl/networking)

```bash
ip addr | grep eth0
```
From Windows - https://172.20.80.183/

## Step 8: Accessing Windows applications from Linux

```bash
cat /etc/resolv.conf
```
From Linux --  curl http://172.20.80.1:500