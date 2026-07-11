// =====================================================
//  initdatabase.js - 终极防御版（修复排序异常）
//  确保 getLatestRecord 永不 reject
// =====================================================

(function() {
    'use strict';

    const STORAGE_KEY = 'intimate_diary';
    let cacheData = null;

    // ----- 加载数据（永不 reject，自动修复损坏）-----
    function loadData() {
        return new Promise((resolve) => {
            try {
                const raw = plus.storage.getItem(STORAGE_KEY);
                if (raw) {
                    cacheData = JSON.parse(raw);
                    if (!Array.isArray(cacheData)) {
                        console.warn('[DB] 数据不是数组，重置');
                        cacheData = [];
                        plus.storage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
                    }
                } else {
                    cacheData = [];
                    plus.storage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
                }
            } catch (e) {
                console.error('[DB] 数据解析失败，执行自动修复:', e.message);
                try {
                    const raw = plus.storage.getItem(STORAGE_KEY);
                    if (raw) plus.storage.setItem(STORAGE_KEY + '_backup', raw);
                } catch (backupErr) {}
                cacheData = [];
                try {
                    plus.storage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
                } catch (writeErr) {
                    console.error('[DB] 写入空数据失败:', writeErr);
                    try { plus.storage.clear(); } catch (clearErr) {}
                }
            }
            resolve(cacheData);
        });
    }

    // ----- 保存数据（带写入验证）-----
    function saveData(data) {
        return new Promise((resolve, reject) => {
            try {
                if (!Array.isArray(data)) {
                    throw new Error('数据必须是数组');
                }
                const jsonStr = JSON.stringify(data);
                plus.storage.setItem(STORAGE_KEY, jsonStr);
                const verifyRaw = plus.storage.getItem(STORAGE_KEY);
                if (verifyRaw !== jsonStr) {
                    throw new Error('写入验证失败');
                }
                JSON.parse(verifyRaw);
                cacheData = data;
                resolve();
            } catch (e) {
                console.error('[DB] 保存失败:', e.message);
                reject(new Error('保存失败: ' + e.message));
            }
        });
    }

    // =====================================================
    //  初始化
    // =====================================================
    async function initDatabase() {
        await loadData();
        return true;
    }

    // =====================================================
    //  工具函数
    // =====================================================
    function getToday() {
        const d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function formatDate(date) {
        return date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0');
    }

    function daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    }

    // =====================================================
    //  业务操作（防御性排序）
    // =====================================================
    async function getAllRecords() {
        const records = await loadData();
        // 过滤掉 current_date 无效的记录，避免排序异常
        const valid = records.filter(r => r && typeof r.current_date === 'string' && r.current_date.length === 10);
        return valid.sort((a, b) => b.current_date.localeCompare(a.current_date));
    }

    async function getLatestRecord() {
        const records = await loadData();
        if (records.length === 0) return null;
        const valid = records.filter(r => r && typeof r.current_date === 'string' && r.current_date.length === 10);
        if (valid.length === 0) return null;
        const sorted = valid.sort((a, b) => b.current_date.localeCompare(a.current_date));
        return sorted[0] || null;
    }

    async function insertRecord(date, duration, useTool, withPartner, methodDesc, useMaterial) {
        const records = await loadData();
        // 确保日期格式有效
        if (!date || date.length !== 10) {
            throw new Error('日期格式无效');
        }
        const maxId = records.reduce((max, r) => Math.max(max, r.id || 0), 0);
        const newRecord = {
            id: maxId + 1,
            current_date: date,
            duration: duration || 0,
            use_tool: !!useTool,
            with_partner: !!withPartner,
            method_desc: (methodDesc || '').replace(/[\n\r]/g, ' ').slice(0, 50),
            use_material: !!useMaterial
        };
        records.push(newRecord);
        await saveData(records);
        return newRecord;
    }

    async function deleteRecordById(id) {
        const records = await loadData();
        const newRecords = records.filter(r => r.id !== id);
        if (newRecords.length === records.length) return false;
        await saveData(newRecords);
        return true;
    }

    async function getStats() {
        const records = await loadData();
        const today = getToday();
        const currentMonth = today.substring(0, 7);
        const totalCount = records.length;
        const monthCount = records.filter(r => r.current_date && r.current_date.startsWith(currentMonth)).length;
        const totalDuration = records.reduce((sum, r) => sum + (r.duration || 0), 0);
        const avgDuration = totalCount > 0 ? Math.round(totalDuration / totalCount) : 0;

        const dateSet = new Set(records.map(r => r.current_date).filter(d => d));
        let streak = 0;
        let checkDate = new Date();
        if (!dateSet.has(today)) {
            checkDate.setDate(checkDate.getDate() - 1);
        }
        while (true) {
            const dStr = formatDate(checkDate);
            if (dateSet.has(dStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
        return { totalCount, monthCount, streak, totalDuration, avgDuration };
    }

    // =====================================================
    //  暴露全局
    // =====================================================
    window.DB = {
        getToday,
        formatDate,
        daysBetween,
        initDatabase,
        getAllRecords,
        getLatestRecord,
        insertRecord,
        deleteRecordById,
        getStats
    };

    window.getToday = window.DB.getToday;
    window.initDatabase = window.DB.initDatabase;
    window.getLatestRecord = window.DB.getLatestRecord;
    window.getAllRecords = window.DB.getAllRecords;
    window.insertRecord = window.DB.insertRecord;
    window.deleteRecordById = window.DB.deleteRecordById;
    window.getStats = window.DB.getStats;

    console.log('[DB] 模块加载完成（终极防御版）');
})();