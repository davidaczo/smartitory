import React from 'react';
import { MovieDetail } from '../../types';
import { Link } from 'react-router-dom';

interface MovieDetailsProps {
    movie: MovieDetail;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    const details: { [key: string]: string | number | null } = {
        'Release Year': movie.release_date,
        'Homepage': movie.homepage,
        'Budget': movie.budget,
        'Revenue': movie.revenue,
        'Imdb id': movie.imdb_id,
        'ProductionCompanies': movie.production_companies.map((company) => company.name).join(', ')
    };

    return (
        <div className="w-full h-full p-8 bg-white shadow-lg rounded-lg lg:col-span-2 mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">{movie.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{movie.overview}</p>
            <div className="space-y-4">
                {Object.entries(details).map(([key, value]) =>
                    value ? (
                        <p key={key} className="text-md text-gray-600">
                            <span className="font-semibold">{key}:</span>{' '}
                            {key === 'Homepage' ? (
                                <Link to={value.toString()} target={'_blank'} className="text-blue-500" >
                                    {value}
                                </Link>

                            ) : (
                                value
                            )}
                        </p>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
