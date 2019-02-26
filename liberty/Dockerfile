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
FROM websphere-liberty:19.0.0.1-webProfile8

LABEL maintainer="nishi2go@gmail.com"

ARG imagesurl=http://liberty-images

# Install required packages
USER root
RUN apt-get update \
 && apt-get install -y --no-install-recommends wget \
 && rm -rf /var/lib/apt/lists/*
RUN wget -q https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && mv wait-for-it.sh /usr/local/bin && chmod +x /usr/local/bin/wait-for-it.sh
USER 1001

WORKDIR /tmp
RUN wget -q ${imagesurl}/wlp-nd-license.jar \
 && java -jar /tmp/wlp-nd-license.jar --acceptLicense /opt/ibm \
 && rm /tmp/wlp-nd-license.jar

ENV KEYSTORE_REQUIRED false