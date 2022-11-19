import { Secret, sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

function generateToken(id: number, role: string): string {
  const token = sign({ id, role }, JWT_SECRET as Secret);

  return token;
}

export default { generateToken };
