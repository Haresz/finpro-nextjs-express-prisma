import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

const addEvent = async (req: Request, res: Response, next: NextFunction) => {
  let { eventName, price, date, time, location, description, categoryId } =
    req.body;
  const { file } = req;
  console.log(file);
  try {
    if (
      !eventName ||
      !price ||
      !date ||
      !time ||
      !location ||
      !description ||
      !categoryId ||
      !file
    ) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'input invalid',
      });
    }
    console.log(req.body);
    console.log(req.params.id);
    const repoAddEvent = await prisma.events.create({
      data: {
        dashboardId: parseInt(req.params.id),
        eventName,
        image: file.path,
        price: parseInt(price),
        date,
        time,
        location,
        description,
        categoryId: parseInt(categoryId),
      },
    });

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

const getAllEvents = async (req: Request, res: Response) => {
  const { page } = req.params;
  const pageN = parseInt(page) * 4 - 4;
  try {
    const count = await prisma.events.aggregate({
      _count: {
        _all: true,
      },
    });
    const repoGetAllEvents = await prisma.events.findMany({
      skip: pageN,
      take: 4,
      include: {
        category: true,
        ticket: true,
      },
    });
    return res.status(200).send({
      status: 200,
      success: true,
      message: 'get all event successfully',
      data: repoGetAllEvents,
      count: count._count._all,
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

const getAllEventsCatgory = async (req: Request, res: Response) => {
  const { category, page } = req.params;
  const pageN = parseInt(page) * 4 - 4;
  try {
    const count = await prisma.events.aggregate({
      where: {
        categoryId: parseInt(category),
      },
      _count: {
        _all: true,
      },
    });
    const repoGetAllEvents = await prisma.events.findMany({
      where: {
        categoryId: parseInt(category),
      },
      skip: pageN,
      take: 4,
      include: {
        category: true,
        ticket: true,
      },
    });
    return res.status(200).send({
      status: 200,
      success: true,
      message: 'get all event successfully',
      data: repoGetAllEvents,
      count: count._count._all,
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

const getDetailEvents = async (req: Request, res: Response) => {
  try {
    const repoDetailEvents = await prisma.events.findUnique({
      where: { id: parseFloat(req.params.id) },
      include: { ticket: true },
    });

    return res.status(200).send({
      status: 200,
      success: true,
      message: 'get detail event successfully',
      data: repoDetailEvents,
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

const updateEvents = async (req: Request, res: Response) => {
  const {
    eventName,
    price,
    date,
    time,
    location,
    description,
    categoryId,
    eventType,
  } = req.body;
  try {
    if (!req.body || !req.params.id) {
      return res.status(401).send({
        status: 401,
        success: true,
        message: 'invalid input',
      });
    }
    const repoUpdateEvent = await prisma.events.update({
      where: { id: parseInt(req.params.id) },
      data: {
        eventName,
        eventType,
        price,
        date,
        time,
        location,
        description,
        categoryId,
      },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Event updated successfully',
      data: repoUpdateEvent,
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

const updateAvailableTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId } = req.params;
  const { ticketType, price, AvailableTicket } = req.body;
  try {
    if (!eventId || (!price && !AvailableTicket && !ticketType)) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Invalid input',
      });
    }
    const agreration: any = await prisma.tickets.aggregate({
      where: { eventId: parseInt(eventId) },
      _sum: {
        AvailableTicket: true,
      },
    });
    const repoUpdateAvailableTicket = await prisma.events.update({
      where: { id: parseInt(eventId) },
      data: { availableTicket: agreration._sum.AvailableTicket },
    });

    return res.status(201).send({
      status: 201,
      success: true,
      data: req.body,
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

const deleteEvents = async (req: Request, res: Response) => {
  try {
    const repoDelete = await prisma.events.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Event Delete successfully',
      data: repoDelete,
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

const findIdEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const repoFindId = await prisma.events.findUnique({
      where: { id: parseInt(id) },
    });
    if (!repoFindId) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Event not found',
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

const publishEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).send({
        status: 401,
        success: false,
        message: 'Event not found',
      });
    }
    const repoOnPublish = await prisma.events.update({
      where: { id: parseInt(id) },
      data: { published: true },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Event Publish successfully',
      data: repoOnPublish,
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

const eventTransaction = async (req: Request, res: Response) => {
  try {
    let agreration: any;
    let repoFindTicket: any;
    await Promise.all(
      req.body.data.map(async (value: any) => {
        // Find Ticket
        repoFindTicket = await prisma.tickets.findUnique({
          where: { id: parseInt(value.ticketId) },
        });
        // Find Stock
        agreration = await prisma.tickets.aggregate({
          where: { eventId: parseInt(repoFindTicket.eventId) },
          _sum: {
            AvailableTicket: true,
            sold: true,
          },
        });
      }),
    );
    // Update Event
    const repoEventUpdate: any = await prisma.events.update({
      where: { id: parseInt(repoFindTicket.eventId) },
      data: {
        availableTicket: agreration._sum.AvailableTicket,
        soldQuantity: agreration._sum.sold,
      },
    });
    // Update Dashboard

    const repoEventDhasboardTransaction: any = await prisma.events.aggregate({
      where: { dashboardId: parseInt(repoEventUpdate.dashboardId) },
      _sum: {
        soldQuantity: true,
      },
    });
    const repoUpdateDhasboard = await prisma.dashboards.update({
      where: {
        id: parseInt(repoEventUpdate.dashboardId),
      },
      data: {
        attendeeCount: repoEventDhasboardTransaction._sum.soldQuantity,
      },
    });
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'trasaction success full',
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

export default {
  getAllEvents,
  getAllEventsCatgory,
  getDetailEvents,
  addEvent,
  updateEvents,
  deleteEvents,
  findIdEvent,
  publishEvent,
  updateAvailableTicket,
  eventTransaction,
};
