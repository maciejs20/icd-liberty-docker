# Building and deploying an IBM Control Desk V7.6.1 with Liberty image to Docker

**This is an experimental version. It does not work properly.**

### Current state

At this stage does start, but some pages are rendered incorrectly ***


### Goals
This project is heavily based on nishi2go/maximo-liberty-docker - altered for IBM Control Desk to work. All credits goes to nishi2go, he did 90% of the work required for ICD to start.
My fork does not support building of pure Maximo, only ICD installation is to be supported.

ICD with Liberty on Docker enables to run Control Desk with WebSphere Liberty on Docker. The images are deployed fine-grained services instead of single instance. The following instructions describe how to set up IBM Control Desk V7.6.1 Docker images. This images consist of several components e.g. WebSphere Liberty, Db2, and ICD installation program.

Before you start, please check the official guide in technotes first. [Maximo Asset Management 7.6.1 WebSphere Liberty Support](https://www-01.ibm.com/support/docview.wss?uid=swg22017219)

![Componets of Docker Images](https://raw.githubusercontent.com/nishi2go/maximo-liberty-docker/master/maximo-liberty-docker.svg?sanitize=true)

## Required packages

1. IBM Installation Manager binaries from [Installation Manager 1.8 download documents](http://www-01.ibm.com/support/docview.wss?uid=swg24037640)
  * agent.installer.linux.gtk.x86_64_1.8.9004.20190423_2015.zip


2. IBM Control Desk V7.6.1 binaries from [Passport Advantage](http://www-01.ibm.com/software/passportadvantage/pao_customer.html)

   *ICD V7.6.1 binaries:*
   * launchpad_761adv_part1.tar.tar
   * icd_launchpad_part2_common.tar.tar

   *IBM WebSphere Liberty base license V9 binaries:*
  * wlp-base-license.jar

  *IBM Db2 Advanced Workgroup Edition V11.1 binaries:*
  * Middl_Inst_DB2_111_Linux_x86-64.tar.gz


3. Fix Pack binaries from [Fix Central](http://www-945.ibm.com/support/fixcentral/)

  IBM ICD V7.6.1 Fix pack 1 binaries:
  * icd_7.6.1.1_part1_adv.zip
  * icd_7.6.1.1_part2_linux64.zip


## Building IBM ICD V7.6.1 with Liberty image by using build tool


You can use a tool for building docker images by using the build tool.

Usage:
```
Usage: build-icd.sh [OPTIONS] [DIR]

-c | --check            Check required packages [not supported at this moment]
-C | --deepcheck        Check and compare checksum of required packages [not supported at this moment]
-r | --remove           Remove images when an image exists in repository [not supported at this moment]
-J | --disable-jms      Disable JMS configurations in application servers
-d | --check-dir [DIR]  The directory for validating packages (Docker for Windows only) [not supported at this moment]
-v | --verbose          Output verbosity in docker build
-h | --help             Show this help text
```

Procedures:

1. Clone this repository
    ```bash
    git clone https://github.com/maciejs20/icd-liberty-docker
    ```
2. Move to the directory
    ```bash
    cd maximo-liberty-docker
    ```
3. Place the downloaded ICD, IBM Db2, IBM Installation Manager and IBM WebSphere Liberty License binaries to a images directory
4. Run build tool
   ```bash
   bash build.sh-icd [-c] [-C] [-r] [Image directory]
   ```

   Example:
   ```bash
   bash build.sh -c -r /images
   ```

   Example for Docker for Windows:
   ```bash
   bash build.sh -c -r -d /images "C:/images"
   ```
   Note 1: This script works on Windows Subsystem on Linux.<br>
   Note 2: md5sum is required. For Mac, install it manually - https://raamdev.com/2008/howto-install-md5sum-sha1sum-on-mac-os-x/
7. Edit docker-compose.yml to enable optional servers e.g. maximo-api, maximo-report and etc.

8. Test Your build with
    ```bash
    docker-compose up --abort-on-container-exit

9. Run containers by using the Docker Compose file to create and deploy instances:
    ```bash
    docker-compose up -d
    ```
    Note: It will take 3-4 hours (depend on your machine) to complete the installation.

    You can scale servers with docker-compose --scale option.
    ```bash
    docker-compose up -d --scale maximo-ui=2
    ```
10. Make sure to be accessible to ICD login page: http://hostname/maximo (hostname is a name/ip of the host that You're running Your docker)

## Skip the maxinst process in starting up the maxdb container by using Db2 restore command

[Maxinst program](http://www-01.ibm.com/support/docview.wss?uid=swg21314938) supports to initialize and create a Maximo database that called during the "deployConfiguration" process in the Maximo installer. This process is painfully slow because it creates more than thousand tables from scratch. To skip the process, you can use a backup database to restore during first boot time in a maxdb service. So then, it can reduce the creation time for containers from second time.

Procedures:
1. Build container images first (follow above instructions)
2. Move to the cloned directory.
    ```bash
    cd maximo-liberty-docker
    ```
3. Make a backup directory.
    ```bash
    mkdir ./backup
    ```
4. Uncomment the following volume configuration in docker-compose.yml.
    ```yaml
      maxdb:
        volumes:
          - type: bind
            source: ./backup
            target: /backup
    ```
5. Run containers by using the Docker Compose file. (follow above instructions)
6. Take a backup from the maxdb service by using a backup tool.
    ```bash
    docker-compose exec maxdb /work/backup.sh maxdb76 /backup
    ```
    Note: Backup image must be only one in the directory. Backup task must fail when more than two images in it.

So that, now you can create the containers from the backup image that is stored in the directory.

## To do
1. Kubernetes
2. Password with Docker secrets
