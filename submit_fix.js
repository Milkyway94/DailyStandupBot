// Fix submit function
function handleSubmit(e) {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('error');
        }
        return false;
    }

    const formData = {
        date: document.getElementById('date').value,
        project: document.getElementById('project').value,
        yesterday: document.getElementById('yesterday').value.trim(),
        today: document.getElementById('today').value.trim(),
        ontrack: document.querySelector('input[name="ontrack"]:checked').value,
        blockers: document.getElementById('blockers').value.trim() || 'Không có',
        user: tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name + ' ' + (tg.initDataUnsafe.user.last_name || '') : 'Unknown'
    };

    // Haptic feedback
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Send via Telegram WebApp sendData (works with webhook)
    if (tg && tg.sendData) {
        tg.sendData(JSON.stringify(formData));
        setTimeout(() => {
            if (tg.close) tg.close();
        }, 1000);
    } else {
        // Fallback for non-Telegram
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
            alert('✅ Báo cáo đã gửi! (Demo mode)');
            document.getElementById('standupForm').reset();
        }, 1500);
    }

    return false;
}
