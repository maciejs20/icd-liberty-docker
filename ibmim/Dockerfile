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

FROM ubuntu:16.04

LABEL maintainer="nishi2go@gmail.com"

ARG imagesurl=ftp://192.168.7.82
ARG updateim=no


ENV TEMP /tmp
WORKDIR /tmp

# Install required packages
RUN apt-get update && apt-get install -y wget unzip && rm -rf /var/lib/apt/lists/*


# Install IBM Installation Manager
ENV IM_IMAGE agent.installer.linux.gtk.x86_64_1.8.9004.20190423_2015.zip

RUN mkdir /Install_Mgr && wget ${imagesurl}/$IM_IMAGE \
 && unzip -q -d /Install_Mgr $IM_IMAGE \
 && rm $IM_IMAGE \
 && /Install_Mgr/installc -log /tmp/IM_Install_Unix.xml -acceptLicense \
 && rm -rf /Install_Mgr

## Update Installation Manager
RUN if [ "${updateim}" = "yes" ]; then /opt/IBM/InstallationManager/eclipse/tools/imcl install com.ibm.cic.agent; fi
