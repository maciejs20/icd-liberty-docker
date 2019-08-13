ARG imagesurl=ftp://192.168.7.82
ENV ICD_IMAGE_1 launchpad_761adv_part1.tar.tar
ENV ICD_IMAGE_2 icd_launchpad_part2_common.tar.tar

# Install IBM Installation Manager
ENV IM_IMAGE agent.installer.linux.gtk.x86_64_1.8.9004.20190423_2015.zip


ENV WLP_LICENSE wlp-base-license.jar

ENV MAM_IMAGE MAM_7.6.1_LINUX64.tar.gz
ENV MAM_FP_IMAGE MAMMTFP761${fp}IMRepo.zip
ENV DB2_IMAGE Middl_Inst_DB2_111_Linux_x86-64.tar.gz
