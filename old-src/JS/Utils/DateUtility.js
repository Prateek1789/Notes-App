class DateUtility {
    static getCurrentDate() {
        const newDate = new Date();

        const date = {
            date: newDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            day: newDate.toLocaleString('default', { weekday: 'long' }),
            month: newDate.toLocaleString('default', { month: 'long' }),
            timestamp: newDate.getTime(),
            isoString: newDate.toISOString()
        };
        return date;
    }

    static formatDate(date, format = 'default') {
        const newDate = new Date(date);
        
        switch(format) {
            case 'short':
                return newDate.toLocaleDateString();
            case 'long':
                return newDate.toLocaleString('default', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            case 'time':
                return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            default:
                return newDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
        }
    }

    static getRelativeTime(date) {
        const now = new Date();
        const past = new Date(date);
        const diffInMs = now - past;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        
        return this.formatDate(date);
    }
} 

export default DateUtility;