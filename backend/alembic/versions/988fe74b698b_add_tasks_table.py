"""add tasks table

Revision ID: 988fe74b698b
Revises: 006ab9cf8f2b
Create Date: 2024-07-01 08:59:17.233184

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '988fe74b698b'
down_revision: Union[str, None] = '006ab9cf8f2b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   op.create_table(
       'tasks',
       sa.Column('id', sa.Integer, primary_key=True),
       sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
       sa.Column('name', sa.String, index=True),
       sa.Column('description', sa.String, index=True),
   )


def downgrade() -> None:
     op.drop_table('tasks')
