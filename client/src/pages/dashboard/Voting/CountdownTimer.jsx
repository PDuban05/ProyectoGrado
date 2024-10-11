import { useEffect, useState } from 'react'; // Importing necessary hooks from React
import Typography from '@mui/material/Typography'; // Importing Typography component from Material UI
import { ContainerClock, StyledCountdown, TimeBlock, TimeLabel } from './StyledComponets/StyledVoting'; // Importing styled components for layout

// Countdown Timer Component
const CountdownTimer = ({ startDate, endDate }) => {
  // State to hold the remaining time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate, endDate));

  useEffect(() => {
    // Setting up an interval to update the time left every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startDate, endDate)); // Recalculate time left
    }, 1000);

    // Cleanup function to clear the interval on component unmount or when dependencies change
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  // If there's no time left, display a message indicating that the campaign has ended
  if (!timeLeft) {
    return <Typography variant="h6">¡La campaña ha finalizado!</Typography>;
  }

  // Render the countdown timer based on the campaign status (upcoming, ongoing, ended)
  return (
    <StyledCountdown>
      {timeLeft.status === 'upcoming' && (
        <>
          <Typography variant="h6">La campaña inicia en:</Typography>
          <TimeDisplay timeLeft={timeLeft} /> {/* Display time left until the campaign starts */}
        </>
      )}
      {timeLeft.status === 'ongoing' && (
        <>
          <Typography variant="h6">La campaña finaliza en:</Typography>
          <TimeDisplay timeLeft={timeLeft} /> {/* Display time left until the campaign ends */}
        </>
      )}
      {timeLeft.status === 'ended' && (
        <>
          <Typography variant="h6">La campaña finalizó hace:</Typography>
          <TimeBlock>
            <Typography variant="h4">{timeLeft.daysSinceEnd}</Typography> {/* Display days since the campaign ended */}
            <TimeLabel>Días</TimeLabel>
          </TimeBlock>
        </>
      )}
    </StyledCountdown>
  );
};

// Component to display the time blocks
const TimeDisplay = ({ timeLeft }) => (
  <ContainerClock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.days}</Typography> {/* Display days left */}
      <TimeLabel>Días</TimeLabel>
    </TimeBlock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.hours}</Typography> {/* Display hours left */}
      <TimeLabel>Horas</TimeLabel>
    </TimeBlock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.minutes}</Typography> {/* Display minutes left */}
      <TimeLabel>Minutos</TimeLabel>
    </TimeBlock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.seconds}</Typography> {/* Display seconds left */}
      <TimeLabel>Segundos</TimeLabel>
    </TimeBlock>
  </ContainerClock>
);

// Function to calculate time left based on the current date, start date, and end date
const calculateTimeLeft = (startDate, endDate) => {
  const now = new Date(); // Get the current date
  const start = new Date(startDate); // Convert startDate to Date object
  const end = new Date(endDate); // Convert endDate to Date object

  // If the current date is before the start date (campaign has not started yet)
  if (now < start) {
    const difference = start - now; // Calculate the difference
    return {
      status: 'upcoming', // Set status to 'upcoming'
      ...calculateDifference(difference), // Return calculated difference
    };
  }

  // If the campaign is ongoing (between the start date and end date)
  if (now >= start && now <= end) {
    const difference = end - now; // Calculate the difference
    return {
      status: 'ongoing', // Set status to 'ongoing'
      ...calculateDifference(difference), // Return calculated difference
    };
  }

  // If the campaign has already ended
  if (now > end) {
    const difference = now - end; // Calculate the difference
    return {
      status: 'ended', // Set status to 'ended'
      daysSinceEnd: Math.floor(difference / (1000 * 60 * 60 * 24)), // Calculate days since the campaign ended
    };
  }

  return null; // Return null if no conditions match
};

// Function to calculate the time difference in days, hours, minutes, and seconds
const calculateDifference = (difference) => {
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)), // Calculate days
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // Calculate hours
    minutes: Math.floor((difference / 1000 / 60) % 60), // Calculate minutes
    seconds: Math.floor((difference / 1000) % 60), // Calculate seconds
  };
};

export default CountdownTimer; // Exporting the CountdownTimer component
