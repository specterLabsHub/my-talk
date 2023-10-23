import { Workspace } from '@typebot.io/schemas'

export const parseNewName = (
  userFullName: string | undefined,
  existingWorkspaces: Pick<Workspace, 'name'>[]
) => {
  const workspaceName = userFullName
    ? `Espaço de trabalho ${userFullName}'s`
    : 'Meu espaço de trabalho'
  let newName = workspaceName
  let i = 1
  while (existingWorkspaces.find((w) => w.name === newName)) {
    newName = `${workspaceName} (${i})`
    i++
  }
  return newName
}
