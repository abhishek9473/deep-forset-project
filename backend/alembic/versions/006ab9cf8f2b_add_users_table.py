"""add users table

Revision ID: 006ab9cf8f2b
Revises: None
Create Date: 2024-07-01 08:51:42.345976

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '006ab9cf8f2b'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   op.create_table(
       'users',
       sa.Column('id', sa.Integer, primary_key=True),
       sa.Column('name', sa.String, index=True),
       sa.Column('email', sa.String, unique=True, index=True),
       sa.Column('password', sa.String),
   )


def downgrade() -> None:
     op.drop_table('users')
