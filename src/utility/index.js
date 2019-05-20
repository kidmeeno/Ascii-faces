

export function timeFormat(previous) {
    var date = new Date();
    var previousDate = new Date(previous);
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;

    var timePeriod = date - previousDate;

    if (timePeriod < min) {
        return Math.round(timePeriod / 1000) + ' seconds ago';
    }

    else if (timePeriod < hour) {
        return Math.round(timePeriod / min) + ' minutes ago';
    }

    else if (timePeriod < day) {
        return Math.round(timePeriod / hour) + ' hours ago';
    }

    else if (timePeriod >= week) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return previousDate.toLocaleDateString("en-US", options);
    }

    else {
        return previousDate.toLocaleDateString("en-US", options);
    }
}