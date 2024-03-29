import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatPostPublicationDate(date: string) {
  return format(new Date(date), 'dd LLL yyyy', { locale: ptBR });
}
