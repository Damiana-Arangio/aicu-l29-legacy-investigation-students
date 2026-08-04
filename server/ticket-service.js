export function createTicketService({ ticketRepository }) {
  return {
    listTickets() {
      return ticketRepository.listTickets();
    },
    getTicket(ticketId) {
      return ticketRepository.findTicketById(ticketId);
    }
  };
}
