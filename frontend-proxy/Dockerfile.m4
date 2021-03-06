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
# Frontend-proxy
#
FROM haproxy:1.8

include(../docker_header.m4)

include(../docker_images.m4)

RUN apt-get update && apt-get install -y  \
		iputils-ping procps telnet

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY docker-entrypoint.sh /
WORKDIR /
RUN chmod +x ./docker-entrypoint.sh

#ENTRYPOINT ["sleep","1d"]
