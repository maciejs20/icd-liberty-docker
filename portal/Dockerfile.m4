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

include(../docker_header.m4)

include(../docker_images.m4)

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

ENV PORTAL_SERVER_HOST portal
ENV PORTAL_SERVER_PORT 3000

COPY config.js /opt/IBM/ServicePortal/

RUN yum -y -q install \
    iputils vim telnet lynx

WORKDIR /opt/IBM/ServicePortal
ENTRYPOINT ["/opt/IBM/node/bin/node", "./app.js"]
