"""add price books column

Revision ID: b64f3fc9d6fc
Revises: 12c3efab2a05
Create Date: 2019-04-29 00:40:24.204761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b64f3fc9d6fc'
down_revision = '12c3efab2a05'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('books', sa.Column('price', sa.Numeric(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('books', 'price')
    # ### end Alembic commands ###
