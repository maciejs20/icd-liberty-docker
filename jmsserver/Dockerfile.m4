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

include(../docker_header.m4)

include(../docker_images.m4)


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
