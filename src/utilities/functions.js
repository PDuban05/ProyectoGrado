export const formatCampaignName = (name) => {
    return encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
  };


export   const formatDateOverlay = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return `Inicia: ${start.toLocaleDateString()}`;
    } else if (now > end) {
      return `Finalizó: ${end.toLocaleDateString()}`;
    }
    return `Finaliza: ${end.toLocaleDateString()}`;
  };