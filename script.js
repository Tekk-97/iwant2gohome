document.addEventListener("DOMContentLoaded", function() {
    let startTime = new Date();
    let endTime = new Date();

    startTime.setHours(8, 0, 0, 0); // 초기 출근 시간 08:00
    endTime.setHours(17, 0, 0, 0);  // 초기 퇴근 시간 17:00

    let totalWorkTime = (endTime - startTime) / 1000; // 총 작업 시간(초)
    let timeDifference = endTime - new Date();

    function updateTime() {
        const now = new Date();
        timeDifference = endTime - now;

        if (timeDifference > 0) {
            const minutesRemaining = Math.floor(timeDifference / 1000 / 60);
            const secondsRemaining = Math.floor(timeDifference / 1000);

            document.getElementById("time-minutes").innerText = `남은 시간: ${minutesRemaining} 분`;
            document.getElementById("time-seconds").innerText = `남은 시간: ${secondsRemaining} 초`;

            const progressBarFill = document.getElementById("progress-bar-fill");
            const progressPercentage = document.getElementById("progress-percentage");
            const progressRatio = (totalWorkTime - secondsRemaining) / totalWorkTime * 100;

            progressBarFill.style.width = `${progressRatio}%`;
            progressPercentage.innerText = `${progressRatio.toFixed(3)}%`;

        } else {
            document.getElementById("time-minutes").innerText = "퇴근 시간입니다!";
            document.getElementById("time-seconds").innerText = "";
            clearInterval(intervalId);
        }
    }

    document.getElementById("set-time").addEventListener("click", function() {
        const startInput = document.getElementById("start-time").value;
        const endInput = document.getElementById("end-time").value;

        // 입력된 시간으로 출근 및 퇴근 시간 설정
        startTime = new Date();
        endTime = new Date();
        const [startHour, startMinute] = startInput.split(":");
        const [endHour, endMinute] = endInput.split(":");

        startTime.setHours(startHour, startMinute, 0, 0);
        endTime.setHours(endHour, endMinute, 0, 0);

        totalWorkTime = (endTime - startTime) / 1000; // 총 작업 시간(초) 다시 계산
        updateTime(); // 변경된 시간으로 즉시 업데이트
    });

    document.getElementById("subtract-time").addEventListener("click", function() {
        // 5초 줄이기
        endTime.setSeconds(endTime.getSeconds() - 5);
        totalWorkTime = (endTime - startTime) / 1000; // 변경된 퇴근 시간에 따라 작업 시간 업데이트
        this.innerText = "양심 없냐?"; // 버튼 텍스트 변경
    });

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
});
