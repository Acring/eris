#!/usr/bin/env sh

# 计算根目录的 yarn.lock 文件的校验和
FILECHECKSUM=$(sha1sum yarn.lock | grep -o '^\S*')
echo "yarn.lock hash is ${FILECHECKSUM}"

# 缓存根目录的 node_modules
cache_root_node_modules() {
    CHECKSUM_NODE_MODULES=${JENKINS_HOME}/"${FILECHECKSUM}_root_node_modules.tar.gz"
    echo "checksum_root_node_modules is ${CHECKSUM_NODE_MODULES}"

    if [ -f "$CHECKSUM_NODE_MODULES" ]; then
        echo "Found matching root node_modules archive. Extracting"
        tar xf $CHECKSUM_NODE_MODULES
    else
        echo "No matching root node_modules folder was found. Installing dependencies"
        yarn install --immutable
        echo "Archiving root node_modules"
        tar cfz $CHECKSUM_NODE_MODULES node_modules
        if [ $? -ne 0 ]; then
            echo "error occurs, do some clean-up"
            rm -rf $CHECKSUM_NODE_MODULES
        fi
    fi
}

# 缓存 packages 和 apps 中的 node_modules
cache_subproject_node_modules() {
    echo "Caching subproject node_modules"
    for project_path in packages/* apps/*; do
        if [ ! -d "$project_path/node_modules" ]; then
            local project_name=$(basename $project_path)
            local subproject_node_modules_archive=${JENKINS_HOME}/${FILECHECKSUM}_${project_name}_node_modules.tar.gz
            echo "Processing ${project_name}, archive: ${subproject_node_modules_archive}"

            if [ -f "$subproject_node_modules_archive" ]; then
                echo "Found matching ${project_name} node_modules archive. Extracting"
                tar xf $subproject_node_modules_archive -C $project_path
            # else # 这部份应该是永远不会执行的，因为每次都会重新安装依赖
            #     echo "No matching ${project_name} node_modules folder was found. Installing dependencies"
            #     cd $project_path
            #     yarn install --frozen-lockfile
            #     cd - # 返回到原始目录
            #     echo "Archiving ${project_name} node_modules"
            #     tar cfz $subproject_node_modules_archive -C $project_path node_modules
            #     error_clean
            fi
        else
            local project_name=$(basename $project_path)
            local subproject_node_modules_archive=${JENKINS_HOME}/${FILECHECKSUM}_${project_name}_node_modules.tar.gz
            echo "Skipping ${project_path} as it already has node_modules"
            echo "Archiving ${project_name} node_modules"
            tar cfz $subproject_node_modules_archive -C $project_path node_modules
            if [ $? -ne 0 ]; then
                echo "error occurs, do some clean-up"
                rm -rf $subproject_node_modules_archive
            fi
        fi
    done
}

prune_node_modules() {
    echo "Prune cached node_modules that have been created more than 30 days."
    find ${JENKINS_HOME}/*_node_modules.tar.gz -type f -mtime +30 -delete -print
}

# 执行缓存操作
cache_root_node_modules
cache_subproject_node_modules

# 清理旧的缓存文件
prune_node_modules
