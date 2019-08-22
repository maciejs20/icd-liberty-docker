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
# Liberty
#
FROM centos:6.10

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


# Install required packages
USER root
RUN yum -y -q install \
    xz wget glibc.i686 libXtst.i686 libgcc.i686 gtk2.i686 \
    gtk3.i686 adwaita-gtk2-theme.i686 PackageKit-gtk3-module.i686 \
    libcanberra.i686 libcanberra-gtk2.i686

RUN  mkdir -p /opt/IBM/ServicePortal

COPY installer.properties /opt/IBM/ServicePortal

RUN  cd /opt/IBM \
  && ls -la \
  && wget  -q ${imagesurl}/$NODEJS_IMAGE \
  && xz -d -c $NODEJS_IMAGE | tar -xvf - \
  && rm $NODEJS_IMAGE  \
  && ln -s node-v8.12.0-linux-x64/ node \
  && ls -la

RUN mkdir -p /opt/IBM/ServicePortal \
  && cd /opt/IBM/ServicePortal \
  && wget  -q ${imagesurl}/$ICDSP_IMAGE \
  && chmod +x ./$ICDSP_IMAGE \
  && ./$ICDSP_IMAGE -i silent -f /opt/IBM/ServicePortal/installer.properties \
  && ls -la \
  && rm -rf $ICDSP_IMAGE \
  && ls -la


WORKDIR /opt/IBM/ServicePortal
ENTRYPOINT ["/opt/IBM/node/bin/node", "./app.js"]
