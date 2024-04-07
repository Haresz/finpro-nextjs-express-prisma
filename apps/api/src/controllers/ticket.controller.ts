import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

const addTicket = async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;
  const { ticketType, price, AvailableTicket } = req.body;
  try {
    if (!eventId || !price || !AvailableTicket) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Invalid input',
      });
    }
    const repoAddTicket = await prisma.tickets.create({
      data: { eventId: parseInt(eventId), ticketType, price, AvailableTicket },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Ticket added successfully',
      data: repoAddTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    });
  }
};

const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ticketType, price, AvailableTicket } = req.body;
  try {
    if (!id || (!price && !AvailableTicket && !ticketType)) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Invalid input',
      });
    }
    const repoUpdateTicket = await prisma.tickets.update({
      where: { id: parseInt(id) },
      data: { ticketType, price, AvailableTicket },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Ticket updated successfully',
      data: repoUpdateTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    });
  }
};

const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Invalid input',
      });
    }
    const repoDeleteTicket = await prisma.tickets.delete({
      where: { id: parseInt(id) },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Ticket delete successfully',
      data: repoDeleteTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    });
  }
};

const findUniqeTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const repoFindId = await prisma.tickets.findUnique({
      where: { id: parseInt(id) },
    });
    if (!id || !repoFindId) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Invalid input',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: 'server error',
      error: (error as Error).message,
    });
  }
};

export default {
  addTicket,
  updateTicket,
  deleteTicket,
  findUniqeTicket,
};