import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false // Disable logging for cleaner output
});

// Define Content model
const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('text', 'link', 'image', 'file'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  content: DataTypes.TEXT,
  imageUrl: DataTypes.STRING,
  linkUrl: DataTypes.STRING
}, {
  timestamps: true,
  underscored: true
});

// Define Review model
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

// Relationships
Content.hasMany(Review, { as: 'reviews', onDelete: 'CASCADE' });
Review.belongsTo(Content);

// Sync database
export async function initDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log('✓ SQLite Database synced');
  } catch (error) {
    console.error('Database sync error:', error);
  }
}

export { sequelize, Content, Review };
