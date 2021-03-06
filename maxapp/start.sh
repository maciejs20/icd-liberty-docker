#!/bin/bash
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

if [ "$JVM_HEAP_MIN_SIZE" != "" ]
then
  echo "-Xms$JVM_HEAP_MIN_SIZE" >> /config/jvm.options
fi

if [ "$JVM_HEAP_MAX_SIZE" != "" ]
then
  echo "-Xmx$JVM_HEAP_MAX_SIZE" >> /config/jvm.options
fi

until [ -f "$MAXIMO_DIR/maximo.properties" ]
do
  sleep 1
done

cp "$MAXIMO_DIR/maximo.properties" /config/

#if [ "$ADMIN_USER_NAME" != "" ]
#then
#  sed -i "1iWAS.AdminUserName=$ADMIN_USER_NAME" /config/maximo.properties
#fi

#if [ "$ADMIN_PASSWORD" != "" ]
#then
#  sed -i "1iWAS.AdminPassword=$ADMIN_PASSWORD"  /config/maximo.properties
#fi

exec /opt/ibm/wlp/bin/server run defaultServer
