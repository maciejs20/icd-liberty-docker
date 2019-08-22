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
#
# Jmsserver
#
# limitations under the License.
FROM icd-liberty/liberty

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



ENV JMS_SERVER_PORT 9011
ENV JMS_SERVER_SSL_PORT 19011
ENV JVM_HEAP_MAX_SIZE=1024m
ENV JVM_HEAP_MIN_SIZE=512m

USER root
COPY --chown=1001:0 start.sh /opt/ibm/docker/
RUN chmod 755 /opt/ibm/docker/start.sh
COPY --chown=1001:0 server.xml /config
COPY --chown=1001:0 jvm.options /config

USER 1001
RUN installUtility install --acceptLicense /config/server.xml

CMD ["/opt/ibm/docker/start.sh"]
