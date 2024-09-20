const initialData = [
    {
      title: 'options.tpms.title',
      description: 'options.tpms.description',
      image: 'tpms'
    },
    {
      title: 'options.maxiload.title',
      description: 'options.maxiload.description',
      image: 'maxiLoad'
    }
  ];
  
  initialData.forEach(async (option) => {
    await fetch('/api/options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(option)
    });
  });