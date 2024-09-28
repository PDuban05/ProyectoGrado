import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { ContainerClock, StyledCountdown, TimeBlock, TimeLabel } from './StyledComponets/StyledVoting';

const CountdownTimer = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate, endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startDate, endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  if (!timeLeft) {
    return <Typography variant="h6">¡La campaña ha finalizado!</Typography>;
  }

  return (
    <StyledCountdown>
      {timeLeft.status === 'upcoming' && (
        <>
          <Typography variant="h6">La campaña inicia en:</Typography>
          <TimeDisplay timeLeft={timeLeft} />
        </>
      )}
      {timeLeft.status === 'ongoing' && (
        <>
          <Typography variant="h6">La campaña finaliza en:</Typography>
          <TimeDisplay timeLeft={timeLeft} />
        </>
      )}
      {timeLeft.status === 'ended' && (
        <>
          <Typography variant="h6">La campaña finalizó hace:</Typography>
          <TimeBlock>
            <Typography variant="h4">{timeLeft.daysSinceEnd}</Typography>
            <TimeLabel>Días</TimeLabel>
          </TimeBlock>
        </>
      )}
    </StyledCountdown>
  );
};

const TimeDisplay = ({ timeLeft }) => (
  <ContainerClock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.days}</Typography>
      <TimeLabel>Días</TimeLabel>
    </TimeBlock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.hours}</Typography>
      <TimeLabel>Horas</TimeLabel>
    </TimeBlock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.minutes}</Typography>
      <TimeLabel>Minutos</TimeLabel>
    </TimeBlock>
    <TimeBlock>
      <Typography variant="h4">{timeLeft.seconds}</Typography>
      <TimeLabel>Segundos</TimeLabel>
    </TimeBlock>
  </ContainerClock>
);

const calculateTimeLeft = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Si la fecha actual es anterior a la fecha de inicio (campaña aún no ha empezado)
  if (now < start) {
    const difference = start - now;
    return {
      status: 'upcoming',
      ...calculateDifference(difference),
    };
  }

  // Si la campaña está en curso (entre la fecha de inicio y final)
  if (now >= start && now <= end) {
    const difference = end - now;
    return {
      status: 'ongoing',
      ...calculateDifference(difference),
    };
  }

  // Si la campaña ya ha finalizado
  if (now > end) {
    const difference = now - end;
    return {
      status: 'ended',
      daysSinceEnd: Math.floor(difference / (1000 * 60 * 60 * 24)),
    };
  }

  return null;
};

const calculateDifference = (difference) => {
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default CountdownTimer;
