import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatPostPublicationDate(date: string) {
  const formattedDate = format(new Date(date), 'ee LLL yyyy', { locale: ptBR });

  return formattedDate;
}
