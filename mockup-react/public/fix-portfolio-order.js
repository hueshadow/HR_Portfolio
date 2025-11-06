/**
 * 快速调整脚本：将华为云项目移到第一位
 *
 * 使用方法：
 * 1. 在浏览器中打开网站主页
 * 2. 按 F12 打开开发者工具
 * 3. 切换到 Console（控制台）标签
 * 4. 复制并粘贴下面的代码，按回车执行
 */

(function() {
    console.log('🔧 开始调整项目顺序...');

    // 获取当前项目数据
    const projectsDataStr = localStorage.getItem('projectsData');

    if (!projectsDataStr) {
        console.error('❌ 未找到项目数据！请先访问网站主页。');
        return;
    }

    let projects = JSON.parse(projectsDataStr);

    console.log('📊 当前项目顺序：');
    projects.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.title} (ID: ${p.id})`);
    });

    // 查找华为云项目
    const huaweiCloudIndex = projects.findIndex(p =>
        p.title === '华为云' || p.title.includes('Huawei Cloud') || p.title.includes('华为云')
    );

    if (huaweiCloudIndex === -1) {
        console.error('❌ 未找到华为云项目！');
        return;
    }

    if (huaweiCloudIndex === 0) {
        console.log('✅ 华为云项目已经在第一位，无需调整。');
        return;
    }

    // 移动华为云到第一位
    const huaweiCloudProject = projects.splice(huaweiCloudIndex, 1)[0];
    projects.unshift(huaweiCloudProject);

    // 保存更新后的顺序
    localStorage.setItem('projectsData', JSON.stringify(projects));

    console.log('\n🎉 项目顺序已更新：');
    projects.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.title} (ID: ${p.id})`);
    });

    console.log('\n✅ 调整完成！请刷新页面查看效果。');

    // 询问是否自动刷新
    if (confirm('项目顺序已调整！是否立即刷新页面查看效果？')) {
        window.location.reload();
    }
})();
