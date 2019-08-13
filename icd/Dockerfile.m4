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
# ICD
#

FROM icd-liberty/ibmim

include(../docker_header.m4)

ARG fp=1
ARG installfp=yes
ARG enablejms=yes
ARG dbalias=MAXDB76

include(../docker_images.m4)

ENV TEMP /tmp
WORKDIR /tmp

# Install required packages
RUN apt-get update && apt-get install -y netcat wget inetutils-ping vim \
 dos2unix apache2 xmlstarlet && rm -rf /var/lib/apt/lists/*

## Install ICD middleware and installer
RUN mkdir /Launchpad
WORKDIR /Launchpad

## Install ICD V7.6.1
ENV BYPASS_PRS=True


RUN mkdir Launchpad

ADD ICDSilentResponse.xml Launchpad



RUN cd Launchpad && echo "*** getting first file." && wget -q ${imagesurl}/$ICD_IMAGE_1 && \
echo "*** extracting first file." && tar xvpf $ICD_IMAGE_1 && \
echo "*** getting second file." && wget  -q ${imagesurl}/$ICD_IMAGE_2 && \
echo "*** extracting second file." && tar xvpf $ICD_IMAGE_2 && \
cd .. && echo "dir: " && \
ls -la && ls -la Launchpad && ls -la Launchpad/Install && \
echo "--- ICD  repo" && ls -la  Launchpad/Install/ControlDeskRepo && \
echo "--- SP   repo" && ls -la  Launchpad/Install/ServiceProviderRepo && \
echo "--- TPAE repo" && ls -la  Launchpad/Install/TPAEInstallerRepository && \
echo "--- MW   repo" && ls -la  Launchpad/Install/MWInstallerRepository && \
echo "--- OPT  repo" && ls -la  Launchpad/Install/ControlDeskOptionalContentRepo && \
echo "*** Installing ICD." && /opt/IBM/InstallationManager/eclipse/tools/imcl \
 -input Launchpad/ICDSilentResponse.xml    -acceptLicense -log /tmp/ICD_Install_Unix.xml && \
 echo "*** clean install dir" && \
 rm Launchpad/$ICD_IMAGE_1 && rm Launchpad/$ICD_IMAGE_2 && rm -rf Launchpad && \
 cd .. && rm -rf Launchpad && echo "*** Done"

# Install Maximo V7.6.1 feature pack
#RUN mkdir /work
#WORKDIR /work
#ENV MAM_FP_IMAGE MAMMTFP761${fp}IMRepo.zip
#RUN if [ "${installfp}" = "yes" ]; then wget -q ${imagesurl}/$MAM_FP_IMAGE && sleep 10 \
# && /opt/IBM/InstallationManager/eclipse/tools/imcl install \
# com.ibm.tivoli.tpae.base.tpae.main -repositories /work/$MAM_FP_IMAGE \
# -installationDirectory /opt/IBM/SMP -log /tmp/TPAE_FP_Install_Unix.xml -acceptLicense \
# && /opt/IBM/InstallationManager/eclipse/tools/imcl install \
# com.ibm.tivoli.tpae.base.mam.main -repositories /work/$MAM_FP_IMAGE \
# -installationDirectory /opt/IBM/SMP -log /tmp/MAM_FP_Install_Unix.xml -acceptLicense \
# && rm /work/$MAM_FP_IMAGE; fi

RUN dos2unix /opt/IBM/SMP/maximo/deployment/was-liberty-default/*.sh

COPY *.sh /work/
RUN chmod +x /work/*.sh && /work/buildwars.sh && rm /work/buildwars.sh

RUN mkdir /opt/IBM/SMP/maximo/tools/maximo/en/liberty
COPY liberty.dbc /opt/IBM/SMP/maximo/tools/maximo/en/liberty/

RUN wget -q https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && mv wait-for-it.sh /usr/local/bin && chmod +x /usr/local/bin/wait-for-it.sh

ENV MAXIMO_DIR /maximo
ENV MAXDB ${dbalias}

ENTRYPOINT ["/work/startinstall.sh"]
