"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createGame(prompt: string, modelId: string) {
  const { orgId } = await auth();

  if (!orgId) {
    return null;
  }

  const game = await prisma.game.create({
    data: {
      orgId,
      title: prompt.substring(0, 100),
      messages: [
        {
          role: "user",
          content: prompt,
          modelId,
        },
      ],
    },
  });

  return game;
}

export async function listGames() {
  const { orgId } = await auth();

  if (!orgId) {
    return [];
  }

  return prisma.game.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getGame(gameId: string) {
  const { orgId } = await auth();

  if (!orgId) {
    return null;
  }

  return prisma.game.findFirst({
    where: {
      id: gameId,
      orgId,
    },
  });
}

export async function updateGame(gameId: string, updates: string) {
  const { orgId } = await auth();

  if (!orgId) {
    return null;
  }

  const existingGame = await prisma.game.findFirst({
    where: {
      id: gameId,
      orgId,
    },
  });

  if (!existingGame) {
    return null;
  }

  const updateData = JSON.parse(updates);

  return prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      title: updateData.title,
      messages: updateData.messages,
      updatedAt: new Date(),
    },
  });
}

export async function deleteGame(gameId: string) {
  const { orgId } = await auth();

  if (!orgId) {
    return null;
  }

  const existingGame = await prisma.game.findFirst({
    where: {
      id: gameId,
      orgId,
    },
  });

  if (!existingGame) {
    return null;
  }

  return prisma.game.delete({
    where: {
      id: gameId,
    },
  });
}
