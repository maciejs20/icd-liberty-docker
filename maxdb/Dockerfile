# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# maxdb
#

FROM ubuntu:16.04


LABEL maintainer="nishi2go@gmail.com"



#ARG imagesurl=ftp://192.168.7.82

ARG imagesurl=http://liberty-images/images

#ICD 7.6.1 install files
ENV ICD_IMAGE_1 launchpad_761adv_part1.tar.tar
ENV ICD_IMAGE_2 icd_launchpad_part2_common.tar.tar

#IBM Installation Manager
ENV IM_IMAGE agent.installer.linux.gtk.x86_64_1.8.9004.20190423_2015.zip

#Liberty license
ENV WLP_LICENSE wlp-base-license.jar

#ICD fixpack
ENV ICD_FP_IMAGE_1 icd_7.6.1.1_part1_adv.zip
ENV ICD_FP_IMAGE_2 icd_7.6.1.1_part2_linux64.zip

#DB2 install image
ENV DB2_IMAGE Middl_Inst_DB2_111_Linux_x86-64.tar.gz

#Service Portal
ENV ICDSP_IMAGE serviceportal_linux.bin
ENV NODEJS_IMAGE node-v8.12.0-linux-x64.tar.xz.tar.xz



ARG backupdir=/backup
ARG dbalias=MAXDB76

## Install required software
RUN dpkg --add-architecture i386
RUN apt-get update -y && apt-get install -y sudo wget unzip bsdtar netcat file less net-tools \
    libx32stdc++6 libpam0g:i386 binutils libaio1 libnuma1 netbase \
    && rm -rf /var/lib/apt/lists/*



# Install IBM DB2


ENV DB_MAXIMO_PASSWORD changeit
ENV DB2_PATH /home/ctginst1/sqllib
ENV MAXDB ${dbalias}
ENV DB_PORT 50005
ENV BACKUPDIR ${backupdir}

RUN groupadd ctggrp1
RUN groupadd maximo
RUN useradd -g ctggrp1 -m -d /home/ctginst1 ctginst1
RUN useradd -g maximo -m -d /home/maximo maximo

RUN echo "maximo:${DB_MAXIMO_PASSWORD}" | chpasswd

RUN echo "db2c_db2inst1         $DB_PORT/tcp" >> /etc/services

#RUN echo "ctginst1    ALL=(root) NOPASSWD: /usr/sbin/chpasswd, $DB2_PATH/instance/db2rfe " >> /etc/sudoers.d/ctginst1
RUN echo "ctginst1    ALL=(ALL) NOPASSWD:ALL " >> /etc/sudoers.d/ctginst1

RUN mkdir ${backupdir}
RUN chown ctginst1.ctggrp1 ${backupdir}
RUN chmod 700 ${backupdir}

RUN mkdir /work
RUN chown ctginst1.ctggrp1 /work


# Install DB2 V11.1 and Fixpack
WORKDIR /tmp
USER ctginst1
COPY --chown=ctginst1:ctggrp1 db2awse.rsp /tmp

RUN mkdir Install \
  && cd Install \
  && echo "*** Download DB2 image" \
  && wget -q ${imagesurl}/$DB2_IMAGE \
  && ls -la \
  && echo "*** Extract DB2 image" \
  && bsdtar -zxpf $DB2_IMAGE \
  && ls -la && ls -la Install && ls -la Install/mwi_madt_DB2AWSv11.1.0.0_images/files \
  && bsdtar -zxpf  Install/mwi_madt_DB2AWSv11.1.0.0_images/files/DB2_AWSE_REST_Svr_11.1_Lnx_86-64_11.1.0.0.tar.gz \
  && ls -la && ls -la Install && ls -la Install/mwi_madt_DB2AWSv11.1.0.0_images/files \
  && echo "*** Install DB2" \
  && ls -la && ls -la /tmp && ls -la /tmp/Install \
  && pwd && cat /tmp/db2awse.rsp \
  && ./server_awse_o/db2setup -r /tmp/db2awse.rsp \
  && echo "*** Install license" \
  && $DB2_PATH/adm/db2licm -a ./server_awse_o/db2/license/db2awse_o.lic \
  && $DB2_PATH/adm/db2licm -l \
  && cd .. && rm -rf Install \
  && echo "*** Clean up" \
  && . ~/sqllib/db2profile \
  # && db2stop \
  #&& wget -q ${imagesurl}/$DB2_FP_IMAGE \
  #&& bsdtar -zxpf $DB2_FP_IMAGE \
  #&& cd server_t \
  #&& ./installFixPack -n -f update -f nobackup -f db2lib  \
  && cd .. \
  && pwd && ls -la && ls -la /tmp \
  && rm -rf /tmp/*

  COPY --chown=ctginst1:ctggrp1 *.sh /work/
  RUN chmod -R 700 /work/
  USER root
  RUN echo "0 localhost 0" > /home/ctginst1/sqllib/db2nodes.cfg
  RUN chown root:root /home/ctginst1/sqllib/security/db2chpw \
      && chown root:root /home/ctginst1/sqllib/security/db2ckpw \
      && chmod 4511 /home/ctginst1/sqllib/security/db2chpw \
      && chmod 4511 /home/ctginst1/sqllib/security/db2ckpw

  USER ctginst1

  RUN echo "*** Exec" \
  && /work/installdb2.sh

WORKDIR /work

ENTRYPOINT ["/work/startdb2.sh"]
